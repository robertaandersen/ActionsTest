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
        }),
        unicornAffected,
  )
.parse();



function unicornAffected(args: AffectedProjects) {
  process.exit(args.affected.some(item => unicornApps.includes(item)) ? 0 : 1);
}

