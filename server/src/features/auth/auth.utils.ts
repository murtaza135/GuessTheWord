import { Profile } from 'passport';

function extractProfileName(profile: Profile) {
  if (profile.name?.familyName && profile.name?.givenName) {
    return `${profile.name.givenName} ${profile.name.familyName}`;
  }
  if (profile.name?.givenName) return profile.name.givenName;
  if (profile.name?.familyName) return profile.name.familyName;
  return null;
}

function extractProfileEmail(profile: Profile) {
  if (profile.emails && profile.emails.length > 0) {
    return profile.emails[0].value ?? null;
  }
  return null;
}

function extractProfileImage(profile: Profile) {
  if (profile.photos && profile.photos.length > 0) {
    return profile.photos[0].value ?? null;
  }
  return null;
}

export function transformProfile(profile: Profile) {
  const userData = {
    name: extractProfileName(profile)
      ?? (profile.displayName as string | undefined)
      ?? profile.username,
    email: extractProfileEmail(profile),
    image: extractProfileImage(profile)
  };

  const accountData = {
    accountId: profile.id,
    provider: profile.provider,
    username: profile.username
  };

  return { userData, accountData };
}
