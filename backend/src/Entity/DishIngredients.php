<?php

namespace App\Entity;

use App\Repository\DishIngredientsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=DishIngredientsRepository::class)
 */
class DishIngredients
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Dish::class, inversedBy="dishIngredients" ,fetch="EAGER")
     * @ORM\JoinColumn(nullable=false)
     */
    private $dish;

    /**
     * @ORM\ManyToOne(targetEntity=Ingredient::class, fetch="EAGER")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Ingredient;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $quantity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIngredient(): ?Ingredient
    {
        return $this->Ingredient;
    }

    public function setIngredient(?Ingredient $Ingredient): self
    {
        $this->Ingredient = $Ingredient;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(?int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }
}
