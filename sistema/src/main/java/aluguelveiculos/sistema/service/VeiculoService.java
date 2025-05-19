package aluguelveiculos.sistema.service;

import java.util.List;

import org.springframework.stereotype.Service;
import aluguelveiculos.sistema.model.Veiculo;
import aluguelveiculos.sistema.repository.VeiculoRepository;

@Service
public class VeiculoService {
     private final VeiculoRepository veiculoRepository;

    public VeiculoService(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    public Veiculo salvar(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    public Veiculo buscarPorId(Long id) {
        return veiculoRepository.findById(id).orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
    }

    public void atualizarDisponibilidade(Long id, boolean disponivel) {
        Veiculo veiculo = buscarPorId(id);
        veiculo.setDisponivel(disponivel);
        veiculoRepository.save(veiculo);
    }
}
