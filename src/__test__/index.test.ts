import {
  calculateRoleTravelTime,
  calculateRoleMaintenanceTime,
  calculateRolesTotalTime,
} from "../index";

describe("calculate repair route", () => {
  it("should calculate total travel time", () => {
    expect(() =>
      calculateRoleTravelTime([2, 4, 3, 5], ["S", "F", "SF", "FF"], "S")
    ).toThrow("distance isn't correct length");

    expect(calculateRoleTravelTime([3, 10], ["MMM", "SMF", "FMS"], "S")).toBe(
      13
    );
    expect(calculateRoleTravelTime([3, 10], ["MMM", "SMF", "FMS"], "F")).toBe(
      13
    );
    expect(calculateRoleTravelTime([3, 10], ["MMM", "SMF", "FMS"], "M")).toBe(
      13
    );

    expect(
      calculateRoleTravelTime([2, 4, 3], ["S", "F", "SF", "FF"], "S")
    ).toBe(6);
    expect(
      calculateRoleTravelTime([2, 4, 3], ["S", "F", "SF", "FF"], "F")
    ).toBe(9);
    expect(
      calculateRoleTravelTime([2, 4, 3], ["S", "F", "SF", "FF"], "M")
    ).toBe(0);

    expect(
      calculateRoleTravelTime(
        [4, 17, 3, 6, 9, 11],
        ["MS", "SFF", "MS", "S", "FM", "MMMM", "FF"],
        "S"
      )
    ).toBe(24);
    expect(
      calculateRoleTravelTime(
        [4, 17, 3, 6, 9, 11],
        ["MS", "SFF", "MS", "S", "FM", "MMMM", "FF"],
        "F"
      )
    ).toBe(50);
    expect(
      calculateRoleTravelTime(
        [4, 17, 3, 6, 9, 11],
        ["MS", "SFF", "MS", "S", "FM", "MMMM", "FF"],
        "M"
      )
    ).toBe(39);
  });

  it("should calculate maintenance time", () => {
    expect(calculateRoleMaintenanceTime(["S", "F", "SF", "FF"], "S")).toBe(2);
    expect(calculateRoleMaintenanceTime(["S", "F", "SF", "FF"], "F")).toBe(20);
    expect(calculateRoleMaintenanceTime(["S", "F", "SF", "FF"], "M")).toBe(0);

    expect(calculateRoleMaintenanceTime(["MMM", "SMF", "FMS"], "F")).toBe(10);
    expect(calculateRoleMaintenanceTime(["MMM", "SMF", "FMS"], "M")).toBe(40);
    expect(calculateRoleMaintenanceTime(["MMM", "SMF", "FMS"], "S")).toBe(2);

    expect(
      calculateRoleMaintenanceTime(
        ["MS", "SFF", "MS", "S", "FM", "MMMM", "FF"],
        "S"
      )
    ).toBe(4);
    expect(
      calculateRoleMaintenanceTime(
        ["MS", "SFF", "MS", "S", "FM", "MMMM", "FF"],
        "F"
      )
    ).toBe(25);
    expect(
      calculateRoleMaintenanceTime(
        ["MS", "SFF", "MS", "S", "FM", "MMMM", "FF"],
        "M"
      )
    ).toBe(56);
  });

  it("should calculate total time", () => {
    expect(() =>
      calculateRolesTotalTime([2, 4, 3, 5], ["S", "F", "SF", "FF"])
    ).toThrow("distance isn't correct length");

    expect(calculateRolesTotalTime([2, 4, 3], ["S", "F", "SF", "FF"])).toBe(37);
    expect(calculateRolesTotalTime([3, 10], ["MMM", "SMF", "FMS"])).toBe(91);
    expect(
      calculateRolesTotalTime(
        [4, 17, 3, 6, 9, 11],
        ["MS", "SFF", "MS", "S", "FM", "MMMM", "FF"]
      )
    ).toBe(198);
  });
});
