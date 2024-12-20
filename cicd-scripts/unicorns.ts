import yargs  from 'yargs';

const unicornApps = [
 'unicorn'
]


export interface AffectedProjects {
    affected: string[]
  }

yargs(process.argv.slice(2))
.command<AffectedProjects>(
    ['unicorn-affected'],
    'Returns true if the affected projects contain a unicorn',
    (yargs)=>
      yargs
        .option('affected', {
          requiresArg: true,
          alias: ['affected'],
          type: 'array',
          demandOption: true,
          default: [],
        }),
        unicornAffected,
  )
.parse();



function unicornAffected(args: AffectedProjects) {
  const unicornAppFoundInaffected = args.affected.some(item => unicornApps.includes(item));
  if(unicornAppFoundInaffected){
    process.exit(0);
  } else {
    process.exit(1);
  }
}

