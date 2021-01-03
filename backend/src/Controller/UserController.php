<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Service\PasswordEncoder;
use App\Repository\UserRepository;
use App\Serializer\UserSerializer;
use App\Serializer\ShoppingListSerializer;
use App\Repository\ShoppingListRepository;
use App\Entity\ShoppingList;
use App\Entity\User;




class UserController extends AbstractController
{

    /**
     * @Route("/users", name="Users_get_all", methods={"GET"})
     */
    public function getAll(
        Request $request,
        UserRepository $repository,
        UserSerializer $serializer): JsonResponse {
        
    
        $users = $repository->findAll();

        return new JsonResponse(
            $serializer->serialize($users),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }



    /**
     * @Route("/users/{id}",name="Users_get_byId", methods={"GET"})
     */
    public function getById(
        $id,
        UserRepository $repository,
        UserSerializer $serializer): JsonResponse {
        
    
        $user = $repository->findOneBy(["id" => $id]);

        if (is_null ($user)) {
            return new JsonResponse(['error' => "User ID not found"], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse(
            $serializer->serialize($user),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

     /**
     * @Route("/users/{id}/lists", name="Users_get_Lists",  methods={"GET"})
     */
    public function getLists(
        $id,
        UserRepository $repository,
        SerializerInterface $serializer
        ): JsonResponse {
        
        $user = $repository->find($id);

        if (is_null ($user)) {
            return new JsonResponse(['error' => "User ID not found"], JsonResponse::HTTP_NOT_FOUND);
        }
        $userLists = $user->getShoppingLists();
        
        return new JsonResponse(
            $serializer->serialize($userLists, 'json',
                [
                    
                    AbstractNormalizer::IGNORED_ATTRIBUTES => ['user'],
                    AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                        return $object->getId();
                    },
                ]
            ),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

 /**
     * @Route("/users/{id}/lists/active", name="Users_get_active_List",  methods={"GET"})
     */
    public function getActiveLists(
        $id,
        UserRepository $repository,
        SerializerInterface $serializer,
        ShoppingListRepository $listRepository
        ): JsonResponse {
        
        $user = $repository->find($id);

        if (is_null ($user)) {
            return new JsonResponse(['error' => "User ID not found"], JsonResponse::HTTP_NOT_FOUND);
        }
        $activeList = $listRepository->findActiveList ($id);
       
        return new JsonResponse(
            $serializer->serialize($activeList, 'json',
                [
                    
                    AbstractNormalizer::IGNORED_ATTRIBUTES => ['user'],
                    AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
                        return $object->getId();
                    },
                ]
            ),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }


    /**
     * @Route("/users", name="Users_create" , methods={"POST"})
     */
    public function create(
        Request $request, 
        UserRepository $repository, 
        UserSerializer $serializer,
        ValidatorInterface $validator,
        PasswordEncoder  $passwordEncoder
    ): JsonResponse {
        
        $user = $serializer->deserialize($request->getContent());
        
        $errors = $validator->validate($user);
        
        if ($errors->count() !== 0) {
            return new JsonResponse(["error" => "Validation failed"], JsonResponse::HTTP_BAD_REQUEST);
        }
        $passwordEncoder->encode($user->getPassword(), $user);
        $repository->save($user);
        
        return new JsonResponse(
            $serializer->serialize($user),
            JsonResponse::HTTP_CREATED,
            [],
            true
        );
    }

     /**
     * @Route("/users/{id}", name="Users_delete", methods={"DELETE"})
     */
    public function remove(
        $id,
        UserRepository $repository){
            
            $user = $repository->findOneBy(['id' => $id]);

            if (is_null ($user)) {
                return new JsonResponse(['error' => "User not found"], JsonResponse::HTTP_NOT_FOUND);
            }
            
            $repository->delete($user);
                return new JsonResponse(
                    [],
                    JsonResponse::HTTP_NO_CONTENT
            );
        }

}