package Project.winery.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import Project.winery.model.Winery;
import Project.winery.repository.WineryRepository;
import Project.winery.service.WineryService;

@Service
public class JpaWineryService implements WineryService{
	
	@Autowired
	private WineryRepository wineryRepository;

	@Override
	public Winery findOne(Long id) {
		return wineryRepository.findOneById(id);
	}

	@Override
	public List<Winery> findAll() {
		return wineryRepository.findAll();
	}

	@Override
	public Page<Winery> findAll(Integer pageNo) {
		return wineryRepository.findAll(PageRequest.of(pageNo, 5));
	}

	@Override
	public Winery save(Winery winery) {
		return wineryRepository.save(winery);
	}

	@Override
	public Winery update(Winery winery) {
		return wineryRepository.save(winery);
	}

	@Override
	public Winery delete(Long id) {
		Optional<Winery> winery = wineryRepository.findById(id);
		if(winery.isPresent()) {
			wineryRepository.deleteById(id);
			return winery.get();
		}
		return null;
	}

}
