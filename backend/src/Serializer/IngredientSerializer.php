<?php 

namespace App\Serializer;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\Ingredient;
use App\Entity\IngredientCategory;


class IngredientSerializer {

    private $elementAsArray = [];

    private function setArray($element): object {
        $dishIngredientsArray = [];
        $dishIngredients = $element->getDishIngredients();
        
        foreach($dishIngredients as $dishIngredient) {
            $ingredient = $dishIngredient->getIngredient();
            $category = $ingredient->getCategory();
            $dishIngredientsArray[] = [
                'id' => $ingredient->getId(),
                'name' =>$ingredient->getName(),
                'quantity' =>$dishIngredient->getQuantity(),
                'unit' =>$ingredient->getUnit(),
                'categoryId'=>$category->getId(),
                'category'=>$category->getName()

            ];
        }
       
        $this->elementAsArray[] = [
            'id' => $element->getId(),
            'name' => $element->getName(),
            'ingredients' => $dishIngredientsArray
        ];       
        return($this);
    }

    public function serialize($elements){
        if (is_array($elements)) {
            foreach($elements as $element) {
                $this->setArray($element);
            }
        } else {
            $this->setArray($elements);
        }
        
        return \json_encode($this->elementAsArray);
    }
    
   
}