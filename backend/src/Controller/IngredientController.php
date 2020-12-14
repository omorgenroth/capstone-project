<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\IngredientRepository;
use App\Entity\Ingredient;



class IngredientController extends AbstractController
{
    /**
     * @Route("/ingredients", name="Ingredients_get_all")
     */
    public function getAll(SerializerInterface $serializer, IngredientRepository $repository): JsonResponse {
        $ingredients = $repository->findAll();
        $response = $serializer->serialize($ingredients, 'json');
        
        
        return new JsonResponse($response, JsonResponse::HTTP_OK, [], true);
    }

    /**
     * @Route("/ingredients/filter/{filter}", name="Ingredients_filter_ByName")
     */
    public function filterByName( $filter, SerializerInterface $serializer, IngredientRepository $repository): JsonResponse {
        
    
        $ingredients = $repository->filterIngredientsByName($filter);    
        $response = $serializer->serialize($ingredients, 'json');
    
        return new JsonResponse($response, JsonResponse::HTTP_OK, [], true);
    }

}