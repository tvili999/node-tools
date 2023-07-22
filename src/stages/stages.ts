import { configure, inject, run, init, Runner, RunnerKey, ModuleKey, Configurator } from "@tvili999/js-container"

type StageMap = Map<RunnerKey, Function[]>

export type StagesInjectionKey = ModuleKey<StageMap>

export function configureStages(name: StagesInjectionKey, stages: RunnerKey[]) : Configurator {
    if(stages.length == 0)
        throw `No stage was supplied for stages configuration "${name.toString()}"`

    return configure(
        inject(name, () => {
            const stagedRunners: StageMap = new Map();

            for(const stage of stages) {
                stagedRunners.set(stage, [])
            }
            return stagedRunners
        }),
        run(async (container) => {
            const stagedRunners = await container.get(name);

            for(const stage of stages) {
                for(const runner of stagedRunners.get(stage) || []) {
                    await runner(container)
                }
            }
        })
    )
}

export default function (stages: StagesInjectionKey, stage: RunnerKey, runner: Runner) : Configurator {
    return init(async ({get}) => {
        const stagedRunners = await get(stages);

        if(!stagedRunners.has(stage))
            throw `Stages "${stages.toString()}" has no stage ${stage.toString()}`

        const runnersInStage = stagedRunners.get(stage) || []
        runnersInStage.push(runner)
    })
}
