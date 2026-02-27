export function createInitialsAvatar(fullName = "User") {
  const safeName = String(fullName).trim();
  const initials = safeName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "U";

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><rect width='240' height='240' fill='#cbd5e1'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='88' fill='#1e293b'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function normalizeImage(url, fallbackName = "User") {
  if (!url || typeof url !== "string") return createInitialsAvatar(fallbackName);
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://express-t4.onrender.com${url}`;
  return url;
}

function splitFullName(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" ")
  };
}

export function normalizeUser(user = {}, fallbackId = "") {
  const fallbackName = user.name ?? user.fullName ?? user.full_name ?? "";
  const splitName = splitFullName(fallbackName);
  const firstName =
    user.first_name ??
    user.firstName ??
    user.firstname ??
    user.given_name ??
    splitName.firstName;
  const lastName =
    user.last_name ??
    user.lastName ??
    user.lastname ??
    user.family_name ??
    splitName.lastName;

  return {
    id: String(user.id ?? user.user_id ?? user._id ?? user.uuid ?? fallbackId),
    firstName: firstName || "",
    lastName: lastName || "",
    fullName: `${firstName || ""} ${lastName || ""}`.trim(),
    avatar: normalizeImage(
      user.avatar ??
        user.image ??
        user.profile_picture ??
        user.profilePicture ??
        user.picture ??
        user.photo ??
        user.thumbnail,
      `${firstName || ""} ${lastName || ""}`.trim() || "User"
    ),
    email: user.email ?? user.mail ?? ""
  };
}

export function extractUsers(payload) {
  if (Array.isArray(payload)) return payload;
  return payload.users ?? payload.data ?? payload.results ?? payload.items ?? [];
}

export function getNextPage(payload, currentPage) {
  const nextFromLink = payload?.links?.next ?? payload?.next;
  if (typeof nextFromLink === "string" && nextFromLink.length > 0) return nextFromLink;

  const totalPages =
    Number(payload?.totalPages ?? payload?.total_pages ?? payload?.pages ?? payload?.pageCount ?? 0) || 0;
  const hasNext = Boolean(payload?.hasNextPage ?? payload?.hasNext ?? payload?.nextPage);
  const page = Number(payload?.page ?? currentPage);

  if (payload?.nextPage && Number(payload.nextPage) > 0) {
    return `https://express-t4.onrender.com/api/users?page=${Number(payload.nextPage)}`;
  }

  if (hasNext) {
    return `https://express-t4.onrender.com/api/users?page=${page + 1}`;
  }

  if (totalPages > 0 && page < totalPages) {
    return `https://express-t4.onrender.com/api/users?page=${page + 1}`;
  }

  return null;
}
