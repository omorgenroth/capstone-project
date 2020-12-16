<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;
use App\Serializer\TokenSerializer;
use App\Service\LoginService;
use App\Entity\User;
use App\Entity\Token;



class AuthController extends AbstractController
{
    /**
     * @Route("/auth/login", methods={"POST"})
     */
    public function userLogin(
        Request $request, 
        UserRepository $userRepository,
        TokenRepository $tokenRepository,
        TokenSerializer $tokenSerializer,
        LoginService $loginService
        ) : JsonResponse {


        $postData = json_decode($request->getContent(), true);
        $user = $loginService->login($postData['email'], $postData['password']);
    
        if(!$user['isValid']) {
            return $this->json([], JsonResponse::HTTP_UNAUTHORIZED);
        };

        $token = $tokenRepository->create($user['user']);
        

        return new JsonResponse(
            $tokenSerializer->serialize($token),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/auth/logout", methods={"DELETE"})
     */

    public function userLogout(
        Request $request,
        TokenRepository $tokenRepository,
        TokenSerializer $tokenSerializer
    ): JsonResponse {
        $token = $tokenSerializer->deserialize($request->getContent());
        $tokenExists = $tokenRepository->findOneBy(
            [
                'value' => $token->getValue()
            ]
        );

        if($tokenExists === null) {
            return $this->json(["tokenDeleted"=>false], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        
        $tokenRepository->delete($tokenExists);

        return new JsonResponse(
            json_encode(["tokenDeleted"=>true]),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}