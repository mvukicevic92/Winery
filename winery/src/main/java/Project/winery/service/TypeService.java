package Project.winery.service;

import java.util.List;

import org.springframework.data.domain.Page;

import Project.winery.model.Type;

public interface TypeService {
	
	Type findOne(Long id);
	
	List<Type> findAll();
	
	Page<Type> findAll(Integer pageNo);
	
	Type save(Type type);
	
	Type update(Type type);
	
	Type delete(Long id);

}
