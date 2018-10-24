package spring;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
interface ItemsRepository extends MongoRepository<Items, String> {
    Items findByname(String name);
    Items findByitemNumber(int itemNumber);
}