// This file will mimick the most simplest of the operations that happen around I/O.
// Default wait time would be 25ms-300ms, but it can be overriden in each of the request
// to mimick even longer operations and demonstrate the API development in such cases. 
let tasks = [];

// task = { id: UUID, status: PENDING|DONE, interval: 5000 }

module.exports = {
    addTask: function(task) {
        // Ingest the task
        task.addedAt = new Date();
        task.finishedAt = null;
        tasks.push(task);

        // Now run the task
        setInterval(() => {
            // Check if the task exists, 
            var taskIndex = tasks.indexOf(tasks.find(t => t.id == task.id));
            if(taskIndex != -1) {
                // If exists, change the status to done.
                tasks[taskIndex].status = "DONE";
                tasks[taskIndex].finishedAt = new Date();
            }
        }, task.interval || 5000);
    },
    getStatus: function(taskId) {
        var taskIndex = tasks.indexOf(tasks.find(t => t.id == taskId));
        if(taskIndex != -1) {
            return tasks[taskIndex];
        }

        return false;
    },
    getTasks: function() {
        return tasks;
    }
}