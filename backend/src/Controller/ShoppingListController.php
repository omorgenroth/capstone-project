<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Repository\ShoppingListRepository;
use App\Entity\ShoppingList;
use App\Serializer\ShoppingListSerializer;
use App\Repository\UserRepository;


class ShoppingListController extends AbstractController
{
    /**
     * @Route("/lists", name="Lists_get_all", methods={"GET"})
     */
    public function getAll(ShoppingListSerializer $serializer, ShoppinglistRepository $repository): JsonResponse {
        $lists = $repository->findAll();
        $response = $serializer->serialize($lists);
        
        
        return new JsonResponse($response, JsonResponse::HTTP_OK, [], true);
    }


    /**
     * @Route("/lists/{id}", name="Lists_get_byId", methods={"GET"})
     */
    public function getById(int $id,ShoppingListSerializer $serializer, ShoppingListRepository $repository): JsonResponse {

        $list = $repository->findOneBy(['id' => $id]);

        if (is_null ($list)) {
            return new JsonResponse(['error' => "List not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        $response = $serializer->serialize($list);
        return new JsonResponse($response, JsonResponse::HTTP_OK, [], true);
    }


      /**
     * @Route("/lists", name="Lists_create", methods={"POST"})
     */
    public function create( 
        Request $request, 
        ShoppingListRepository $repository,  
        ShoppingListSerializer $serializer, 
        UserRepository $userRepository,   
        ValidatorInterface $validator
        ): JsonResponse {      

        $postData = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['id' => $postData['userId']]);

        if (is_null ($user)) {
            return new JsonResponse(["error" => "User ID not found"], JsonResponse::HTTP_NOT_FOUND);
        }
        $list = $serializer->deserialize($request->getContent());
        $errors = $validator->validate($list);
            
        if ($errors->count() !== 0) {
                return new JsonResponse(["error" => "Validation failed"], JsonResponse::HTTP_BAD_REQUEST);
            }
            
        $list->setUser($user);
        $savedlist = $repository->save($list);

        return new JsonResponse(
                $serializer->serialize($savedlist),
                JsonResponse::HTTP_CREATED,
                [],
                true
            );
    }

       /**
     * @Route("/lists/{id}", name="Lists_update", methods={"PUT"})
     */
    public function update( 
        int $id,
        Request $request, 
        ShoppingListRepository $repository,  
        ShoppingListSerializer $serializer, 
        ValidatorInterface $validator
        ): JsonResponse {      

       
        $list = $repository->findOneBy(['id' => $id]);

        if (is_null ($list)) {
            return new JsonResponse(["error" => "List not found"], JsonResponse::HTTP_NOT_FOUND);
        }
       
        $data = json_decode($request->getContent(), true);
        // $errors = $validator->validate($data);
            
        // if ($errors->count() !== 0) {
        //         return new JsonResponse(["error" => "Validation failed"], JsonResponse::HTTP_BAD_REQUEST);
        //     }
            
         $repository->update($list, $data);

        return new JsonResponse(['Success' => "List updated"]);
    
    }


         /**
     * @Route("/lists/{id}", name="Lists_delete", methods={"DELETE"})
     */
    public function remove(
        $id,
        ShoppingListRepository $repository){
            
            $list = $repository->findOneBy(['id' => $id]);

            if (is_null ($list)) {
                return new JsonResponse(['error' => "List not found"], JsonResponse::HTTP_NOT_FOUND);
            }
            
            $repository->delete($list);
                return new JsonResponse(
                    [],
                    JsonResponse::HTTP_NO_CONTENT
            );
        }


    
}
