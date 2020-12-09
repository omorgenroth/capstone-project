<?php

namespace App\Entity;

use App\Repository\ShoppingListRepository;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ShoppingListRepository::class)
 */
class ShoppingList
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * 
     */
    private $name;

    /**
     * @ORM\Column(type="date")
     */
    private $createdDate;

    /**
     * @ORM\Column(type="json")
     * @Assert\NotBlank
     * @Assert\Type(
     *     type="array",
     *     message="The value {{ value }} is not a valid {{ type }}.")
     */
    private $items = [];

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="shoppingLists")
     */

    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedDate(): ?\DateTimeInterface
    {
        return $this->createdDate;
    }

    public function setCreatedDate(\DateTimeInterface $createdDate): self
    {
        $this->createdDate = $createdDate;

        return $this;
    }

    public function getItems(): ?array
    {
        return $this->items;
    }

    public function setItems(array $items): self
    {
        $this->items = $items;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
