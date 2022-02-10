import intel from './data/intel-cpus.json';
import amd from './data/amd-cpus.json';
import { Cpu } from '@prisma/client';

// Variable Declaration
let culledAMD: Cpu[] = [];
let culledIntel: Cpu[] = [];
let totalCulled = 0;
let amdCulledFile = 'scripts/data/amd-cpus-culled.json';
let intelCulledFile = 'scripts/data/intel-cpus-culled.json';

// Goes through all CPUs and adds them to a new array only if certain parameters are met
intel.map((cpu) => {
  let cullCPU = false;

  if (cpu.family.toLowerCase().includes('legacy')) {
    cullCPU = true;
  } else if (cpu.family.toLowerCase().includes('xeon')) {
    cullCPU = true;
  } else if (cpu.launchYear < 2010) {
    cullCPU = true;
  }

  if (cullCPU) {
    totalCulled++;
  } else {
    culledIntel.push(cpu as Cpu);
  }
});

amd.map((cpu) => {
  let cullCPU = false;

  if (cpu.family.toLowerCase().includes('epyc')) {
    cullCPU = true;
  } else if (cpu.launchYear && cpu.launchYear < 2010) {
    cullCPU = true;
  }

  if (cullCPU) {
    totalCulled++;
  } else {
    culledAMD.push(cpu as Cpu);
  }
});

console.log(`Total culled: ${totalCulled}`);

let fs = require('fs');
fs.writeFile(
  intelCulledFile,
  JSON.stringify(culledIntel),
  function (err: Error) {
    if (err) throw err;
    console.log('complete');
  }
);

fs.writeFile(amdCulledFile, JSON.stringify(culledAMD), function (err: Error) {
  if (err) throw err;
  console.log('complete');
});
