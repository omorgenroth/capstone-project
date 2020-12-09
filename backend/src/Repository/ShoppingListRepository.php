<?php

namespace App\Repository;

use App\Entity\ShoppingList;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ShoppingList|null find($id, $lockMode = null, $lockVersion = null)
 * @method ShoppingList|null findOneBy(array $criteria, array $orderBy = null)
 * @method ShoppingList[]    findAll()
 * @method ShoppingList[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ShoppingListRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ShoppingList::class);
    }

    public function save(ShoppingList $list): ShoppingList  {
        $this->_em->persist($list);
        $this->_em->flush();
        return $list;
    } 

    public function delete(ShoppingList $list): void {
        $this->_em->remove($list);
        $this->_em->flush();
    }
     
    public function update (ShoppingList $list, $data) :ShoppingList {

        empty($data['name']) ? true : $list->setName($data['name']);
        empty($data['items']) ? true : $list->setItems($data['items']);
        $this->_em->persist($list);
        $this->_em->flush();
        return $list;
    }

    

}
