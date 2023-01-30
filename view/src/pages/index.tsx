import useApp from "@/hooks/useApp"

import Home from "./home"
import Config from "./config"
import Run from "./run"
import Tasks from "./tasks"
import Datas from "./datas"
import Outputs from "./outputs"

export default function AutorPage() {
    const context = useApp()
    const { page } = context

    return (
        <>
            {page === "home" && <Home />}
            {page === "config" && <Config />}
            {page === "run" && <Run />}
            {page === "tasks" && <Tasks />}
            {page === "datas" && <Datas />}
            {page === "outputs" && <Outputs />}
        </>
    )
}