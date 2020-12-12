<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Serializer\DishSerializer;
use App\Repository\DishRepository;
use App\Entity\Dish;



class DishController extends AbstractController
{
    /**
     * @Route("/ingredients", name="Ingredients_get_all")
     */
    public function getAll(DishSerializer $serializer, DishRepository $repository): JsonResponse {
        $dishes = $repository->findAll();
        $response = $serializer->serialize($dishes);
        
        
        return new JsonResponse($response, JsonResponse::HTTP_OK, [], true);
    }

}