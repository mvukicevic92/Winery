package Project.winery.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Project.winery.model.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long>{
	
	Type findOneById(Long id);

}
