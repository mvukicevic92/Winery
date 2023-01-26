package Project.winery.service;

import java.util.List;

import org.springframework.data.domain.Page;

import Project.winery.model.Wine;

public interface WineService {
	
	Wine findOne(Long id);
	
	List<Wine> findAll();
	
	Page<Wine> findAll(Integer pageNo);
	
	Wine save(Wine wine);
	
	Wine update(Wine wine);
	
	Wine delete(Long id);
	
	List<Wine> findByWineryId(Long wineryId);
	
	List<Wine> findByTypeId(Long typeId);
	
	Page<Wine> find(String name, Long wineryId, Integer pageNo);
	
	Wine order(Integer quantity ,Long id);
	
	Wine purchase(Integer quantity, Long id);

}
