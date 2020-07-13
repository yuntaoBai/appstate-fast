import { ref } from "vue";
import { useTasksState } from "./TasksState";
import { useSettingsState } from "./SettingsState";
import { self } from "@hookstate/vue";

export function TasksTotal() {
    // Use both global stores in the same component.
    // Note: in fact, it it could be even one state object
    // with functions accessing different nested segments of the state data.
    // It would perform equally well.
    const tasksState = useTasksState();
    const settingsState = useSettingsState();

    // This is the trick to obtain different color on every run of this function
    const colors = ["#ff0000", "#00ff00", "#0000ff"];
    const color = ref(0);
    color.value += 1;
    const nextColor = colors[color.value % colors.length];

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginBottom: 30
            }}
        >
            {settingsState.isHighlightUpdateEnabled && (
                <div
                    style={{
                        width: 10,
                        marginRight: 15,
                        backgroundColor: nextColor
                    }}
                />
            )}
            {tasksState[self].map(
                ts => (
                    <div
                        key=""
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            flexGrow: 2
                        }}
                    >
                        <div>Total tasks: {ts.length}</div>
                        <div>Done: {ts.filter(i => i.done.value).length}</div>
                        <div>
                            Remaining: {ts.filter(i => !i.done.value).length}
                        </div>
                    </div>
                ),
                () => (
                    <></>
                ) // if promised
            )}
        </div>
    );
}
