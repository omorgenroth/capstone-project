<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\DishRepository;
use App\Entity\Dish;



class DishController extends AbstractController
{
    /**
     * @Route("/dishes", name="dish")
     */
    public function getAll(SerializerInterface $serializer, DishRepository $repository): JsonResponse {
        $dishes = $repository->findAll();
        $response = $serializer->serialize($dishes, 'json');
        
        return new JsonResponse($response, JsonResponse::HTTP_OK, [], true);
    }

}