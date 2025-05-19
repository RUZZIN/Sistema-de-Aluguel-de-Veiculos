package aluguelveiculos.sistema.service;

import java.util.List;

import org.springframework.stereotype.Service;

import aluguelveiculos.sistema.model.Aluguel;
import aluguelveiculos.sistema.model.Veiculo;
import aluguelveiculos.sistema.repository.AluguelRepository;
import aluguelveiculos.sistema.repository.VeiculoRepository;

@Service
public class AluguelService {
    private final AluguelRepository aluguelRepository;
    private final VeiculoRepository veiculoRepository;

    public AluguelService(AluguelRepository aluguelRepository, VeiculoRepository veiculoRepository) {
        this.aluguelRepository = aluguelRepository;
        this.veiculoRepository = veiculoRepository;
    }

    public Aluguel registrarAluguel(Aluguel aluguel) {
        Veiculo veiculo = veiculoRepository.findById(aluguel.getVeiculo().getId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        if (!veiculo.isDisponivel()) {
            throw new RuntimeException("Veículo indisponível para aluguel");
        }
        veiculo.setDisponivel(false);
        veiculoRepository.save(veiculo);
        return aluguelRepository.save(aluguel);
    }

    public List<Aluguel> listarAtivos() {
        return aluguelRepository.findByVeiculoDisponivel(false);
    }

    public void devolverVeiculo(Long id) {
        Aluguel aluguel = aluguelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluguel não encontrado"));
        Veiculo veiculo = aluguel.getVeiculo();
        veiculo.setDisponivel(true);
        veiculoRepository.save(veiculo);
    }
}
