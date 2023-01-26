package Project.winery.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Project.winery.model.Wine;

@Repository
public interface WineRepository extends JpaRepository<Wine, Long>{
	
	Wine findOneById(Long id);
	
	List<Wine> findByWineryId(Long wineryId);
	
	List<Wine> findByTypeId(Long typeId);
	
	Page<Wine> findByNameIgnoreCaseContains(String name, Pageable pageable);
	
	Page<Wine> findByNameIgnoreCaseContainsAndWineryId(String name, Long wineryId, Pageable pageable);

}
