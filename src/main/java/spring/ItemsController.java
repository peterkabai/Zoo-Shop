package spring;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemsController {

    @Autowired
    private ItemsRepository itemRepository;
   
    @CrossOrigin(origins = "*")
    @PutMapping(value = "/put/{itemNumber}/{inStock}")
    public Items setItemNumber(
            @PathVariable("itemNumber") int itemNumber, 
            @PathVariable("inStock") int inStock) {
        Items items = itemRepository.findByitemNumber(itemNumber);
        items.setInstock(inStock);
        itemRepository.save(items);
        return items;
    }

    @CrossOrigin(origins = "*")
    @GetMapping (value = "/")
    public List<Items> getAll() {
        return itemRepository.findAll();
    }
    
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/name/{name}")
    public Items getByName(@PathVariable("name") String name) {
        return itemRepository.findByname(name);
    }

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/{itemNumber}")
    public Items getItemNumber(@PathVariable("itemNumber") int itemNumber) {
        return itemRepository.findByitemNumber(itemNumber);
    }
}