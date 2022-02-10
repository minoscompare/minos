import { Cpu } from '@prisma/client';

// Functions
function getPercentageString(value: number, total: number) {
  return Math.round((value / total) * 100) + '%';
}

// Declares constants
const EARLIEST_ALLOWED_YEAR = 2010;
const COL_1_LEN = 20;
const COL_2_LEN = 10;

export default function printDataStats(cpus: Cpu[]) {
  // Declares variables
  let intelCount = 0;
  let amdCount = 0;
  let beforeYear = 0;
  let nullLaunchYear = 0;
  let xeonCpus = 0;
  let epycCpus = 0;
  let legacyIntelCpus = 0;
  let totalCpuCount = cpus.length;

  // Gets data for all CPUs
  cpus.forEach((cpu) => {
    // Checks brand
    if (cpu.brand == 'AMD') {
      amdCount++;
    } else {
      intelCount++;
    }

    // Checks families
    if (cpu.family.toLowerCase().includes('xeon')) {
      xeonCpus++;
    } else if (cpu.family.toLowerCase().includes('epyc')) {
      epycCpus++;
    } else if (cpu.family.toLowerCase().includes('legacy')) {
      legacyIntelCpus++;
    }

    // Checks launch year
    if (cpu.launchYear == null) {
      nullLaunchYear++;
    } else if (cpu.launchYear < EARLIEST_ALLOWED_YEAR) {
      beforeYear++;
    }
  });

  // Prints results
  console.log(`Database Size:`.padEnd(COL_1_LEN) + `${totalCpuCount}\n`);

  console.log(
    `Intel CPUs:`.padEnd(COL_1_LEN) +
      `${intelCount}`.padEnd(COL_2_LEN) +
      `(${getPercentageString(intelCount, totalCpuCount)})`
  );

  console.log(
    `AMD CPUs:`.padEnd(COL_1_LEN) +
      `${amdCount}`.padEnd(COL_2_LEN) +
      `(${getPercentageString(amdCount, totalCpuCount)})`
  );

  console.log(
    `Pre-${EARLIEST_ALLOWED_YEAR}:`.padEnd(COL_1_LEN) +
      `${beforeYear}`.padEnd(COL_2_LEN) +
      `(${getPercentageString(beforeYear, totalCpuCount)})`
  );

  console.log(
    `Intel XEON:`.padEnd(COL_1_LEN) +
      `${xeonCpus}`.padEnd(COL_2_LEN) +
      `(${getPercentageString(xeonCpus, totalCpuCount)})`
  );

  console.log(
    `Intel Legacy:`.padEnd(COL_1_LEN) +
      `${legacyIntelCpus}`.padEnd(COL_2_LEN) +
      `(${getPercentageString(legacyIntelCpus, totalCpuCount)})`
  );

  console.log(
    `AMD EPYC:`.padEnd(COL_1_LEN) +
      `${epycCpus}`.padEnd(COL_2_LEN) +
      `(${getPercentageString(epycCpus, totalCpuCount)})`
  );

  console.log(
    `Null Launch Years:`.padEnd(COL_1_LEN) +
      `${nullLaunchYear}`.padEnd(COL_2_LEN) +
      `(${getPercentageString(nullLaunchYear, totalCpuCount)})`
  );
}
