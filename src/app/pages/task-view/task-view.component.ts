import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Project } from '../models/project.module';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  // Buttons for create windows
  addProjectBtn: boolean = false;
  addTaskBtn: boolean = false;

  // Arrays 
  projects: any[];
  tasks: any[];

  projectId: string;

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the tasks from the db 
    this.route.params.subscribe(
      (params: Params) =>{

        // Get the projectId so it can be used to create task
        this.projectId = params['projectId'];
        
        this.taskService.getTasks(params.projectId).subscribe((tasks: any[]) => {
          this.tasks = tasks;
        })
      }
    );

    // Get the projects from the db 
    this.taskService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects;
    });



  }

  /*==========*/
  /* Projects */
  /*==========*/

  /** create project */
  createProject(title: string){
    // Close window
    this.addProjectBtn != this.addProjectBtn;

    this.taskService.createProject(title).subscribe((project: Project) => {
      // Now naviagte to /projects/project._id after adding to db
      this.router.navigate(['/projects', project._id]);
    });
  }


  /*=======*/
  /* Tasks */
  /*=======*/

  /** Create Task */
  createTask(title: string){
    this.addTaskBtn = !this.addTaskBtn;

    this.taskService.createTask(title, this.projectId).subscribe((task: Task) => {
      console.log(task);
      
    })
  }
}
