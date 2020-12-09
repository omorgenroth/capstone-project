<?php

namespace App\Entity;

use App\Repository\DishRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DishRepository::class)
 */
class Dish
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Assert\Type(
     *     type="string",
     *     message="The value {{ value }} is not a valid {{ type }}.")
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=DishIngredients::class, mappedBy="dish")
     * @Assert\NotNull
     */
    private $dishIngredients;

    public function __construct()
    {
        $this->dishIngredients = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|DishIngredients[]
     */
    public function getDishIngredients(): Collection
    {
        return $this->dishIngredients;
    }

    public function addDishIngredient(DishIngredients $dishIngredient): self
    {
        if (!$this->dishIngredients->contains($dishIngredient)) {
            $this->dishIngredients[] = $dishIngredient;
            $dishIngredient->setDish($this);
        }

        return $this;
    }

    public function removeDishIngredient(DishIngredients $dishIngredient): self
    {
        if ($this->dishIngredients->removeElement($dishIngredient)) {
            // set the owning side to null (unless already changed)
            if ($dishIngredient->getDish() === $this) {
                $dishIngredient->setDish(null);
            }
        }

        return $this;
    }
}
