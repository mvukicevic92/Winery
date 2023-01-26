package Project.winery.service;

import java.util.List;

import org.springframework.data.domain.Page;

import Project.winery.model.Winery;

public interface WineryService {
	
	Winery findOne(Long id);
	
	List<Winery> findAll();
	
	Page<Winery> findAll(Integer pageNo);
	
	Winery save(Winery winery);
	
	Winery update(Winery winery);
	
	Winery delete(Long id);

}
