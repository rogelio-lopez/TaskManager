import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }


  /* Projects */
  createProject(title: string){
    return this.webReqService.post('projects', { title });
  }

  getProjects(){
    return this.webReqService.get('projects');
  }

  getTasks(projectId: string){
    return this.webReqService.get(`projects/${projectId}/tasks`);
  }

  /* Tasks */
  createTask(title: string, projectId: string){
    return this.webReqService.post(`projects/${projectId}/tasks`, { title });
  }
}
