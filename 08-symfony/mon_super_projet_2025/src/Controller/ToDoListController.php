<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TodoListController extends AbstractController
{
    #[Route('/todo/list', name: 'app_todo_list')]
    public function index(): Response
    {
        return $this->render('todo_list/index.html.twig', [
            'controller_name' => 'TodoListController',
        ]);
    }
    #[Route('/todo/add/{label}/{tache}', name: 'app_todo_add')]
    public function create($label, $tache, Request $request): Response
    {
        $sess = $request->getSession();
        $todo = $sess->get("todoList",[]);
        if(isset($todo[$label]))
        {
            $this->addFlash("success", "La tache $label existe déjà");
        }
        else
        {
            $todo[$label] = ["tache"=>$tache, "done"=>false];
            $sess->set("todoList", $todo);
    
            $this->addFlash("success", "$label ajouté à la liste");
        }
        return $this->redirectToRoute("app_todo_list");
    }
    #[Route('/todo/update/{label}', name: 'app_todo_update')]
    public function update($label, Request $request): Response
    {
        $sess = $request->getSession();
        $todo = $sess->get("todoList",[]);
        if(isset($todo[$label]))
        {
            $todo[$label]["done"] = !$todo[$label]["done"];
            $sess->set("todoList", $todo);
            $this->addFlash("success", "$label mis à jour.");
        }
        else
        {
            $this->addFlash("danger", "$label introuvable");
        }
        
        
        return $this->redirectToRoute("app_todo_list");
    }
    #[Route('/todo/add/{label}', name: 'app_todo_delete')]
    public function delete($label, Request $request): Response
    {
        $sess = $request->getSession();
        $todo = $sess->get("todoList",[]);
        if(isset($todo[$label]))
        {
            unset($todo[$label]);
            $sess->set("todoList", $todo);

            $this->addFlash("success", "$label supprimé");
        }
        else
        {
            $this->addFlash("danger", "$label introuvable");
        }
        
        return $this->redirectToRoute("app_todo_list");
    }
}