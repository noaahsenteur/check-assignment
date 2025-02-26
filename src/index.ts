// Time in minutes required for each repair role to service a moped
const repairTimes = {
  S: 1,
  F: 5,
  M: 8,
};

type Mopeds = string[];
type Distance = number[];
type Role = keyof typeof repairTimes;

const roles: Role[] = ["S", "F", "M"];

/* Error used when distance array doesn't match the expected route length */
const distanceLengthError = new Error("distance isn't correct length");

export const calculateRoleTravelTime = (
  distance: Distance,
  mopeds: Mopeds,
  role: Role
): number => {
  // We want to make sure there is always a repair at the end of a route
  if (distance.length !== mopeds.length - 1) {
    throw distanceLengthError;
  }

  /* Find the last repair point where this specific role is needed.
     This helps us determine how far the current role needs to travel. */
  const lastIndex = mopeds.findLastIndex((value) => value.includes(role));

  // If there isn't something to work on for the current role, they can return to HQ
  if (lastIndex <= 0) return 0;

  // Calculate the total travel time for the current role by summing distances up to the last repair point.
  return distance.slice(0, lastIndex).reduce((acc, curr) => acc + curr, 0);
};

export const calculateRoleMaintenanceTime = (mopeds: Mopeds, role: Role) => {
  const currRoleRepairTime = repairTimes[role];

  /* Calculate the total maintenance time in minutes for a specific role.
     Each character in a moped string represents a repair task.
     We count how many times the role's letter appears across all mopeds. */

  return mopeds.reduce((acc, curr) => {
    let next = acc;
    for (let i = 0; i < curr.length; i++) {
      if (curr[i] === role) {
        next += currRoleRepairTime;
      }
    }

    return next;
  }, 0);
};

export const calculateRolesTotalTime = (distance: Distance, mopeds: Mopeds) => {
  // We want to make sure there is always a repair at the end of a route
  if (distance.length !== mopeds.length - 1) {
    throw distanceLengthError;
  }

  /* Calculate the combined travel and maintenance time for all roles.
     Sum up the time only for roles that have maintenance tasks. */
  return roles.reduce((acc, curr) => {
    const role = curr as Role;
    let next = acc;
    const roleTravelTime = calculateRoleTravelTime(distance, mopeds, role);
    const roleMaintenance = calculateRoleMaintenanceTime(mopeds, role);

    if (roleTravelTime > 0) {
      return next + roleMaintenance + roleTravelTime;
    }

    return next;
  }, 0);
};
