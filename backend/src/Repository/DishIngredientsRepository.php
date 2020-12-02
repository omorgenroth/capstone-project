<?php

namespace App\Repository;

use App\Entity\DishIngredients;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DishIngredients|null find($id, $lockMode = null, $lockVersion = null)
 * @method DishIngredients|null findOneBy(array $criteria, array $orderBy = null)
 * @method DishIngredients[]    findAll()
 * @method DishIngredients[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DishIngredientsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DishIngredients::class);
    }

}
