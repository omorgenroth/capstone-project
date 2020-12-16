<?php 

namespace App\Serializer;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\ShoppingList;
use App\Repository\UserRepository;


class ShoppingListSerializer {

   

    private function setArray($element): object {
       
        $this->elementAsArray[] = [
            'id' => $element->getId(),
            'name' => $element->getName(),
            'items' => $element->getItems(),
            'created'=> $element->getCreatedDate(),
            'active' => $element->getActive()
            
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
    
    public function deserialize($content) {
            
            $postData = \json_decode($content);

            
            $classObject = new Shoppinglist();
            $classObject->setName($postData->name);
            $classObject->setItems($postData->items);
            $classObject->setCreatedDate(date_create());
            $classObject->setActive($postData->active);

           
            
         
            return $classObject;
    }
}