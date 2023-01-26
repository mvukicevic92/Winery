package Project.winery.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import Project.winery.model.Type;
import Project.winery.repository.TypeRepository;
import Project.winery.service.TypeService;

@Service
public class JpaTypeService implements TypeService{
	
	@Autowired
	private TypeRepository typeRepository;

	@Override
	public Type findOne(Long id) {
		return typeRepository.findOneById(id);
	}

	@Override
	public List<Type> findAll() {
		return typeRepository.findAll();
	}

	@Override
	public Page<Type> findAll(Integer pageNo) {
		return typeRepository.findAll(PageRequest.of(pageNo, 5));
	}

	@Override
	public Type save(Type type) {
		return typeRepository.save(type);
	}

	@Override
	public Type update(Type type) {
		return typeRepository.save(type);
	}

	@Override
	public Type delete(Long id) {
		Optional<Type> type = typeRepository.findById(id);
		if(type.isPresent()) {
			typeRepository.deleteById(id);
			return type.get();
		}
		return null;
	}

}
