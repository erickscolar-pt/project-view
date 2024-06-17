import { AuthContexts } from '@/contexts/AuthContexts';
import { Tarefa } from '@/model/types';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

interface TarefasListProps {
  tarefas: Tarefa[];
  onUpdateTarefa?: (tarefa: Tarefa) => void;
}

export default function TarefasList({ tarefas, onUpdateTarefa }: Readonly<TarefasListProps>) {
  const { updateTarefa } = useContext(AuthContexts);

  const handleStatusChange = async (tarefa: Tarefa, novoStatus: string) => {
    try {
      const updatedTarefa = { ...tarefa, status: novoStatus };
      await updateTarefa(updatedTarefa);
      toast.success(`Status da tarefa "${tarefa.nome}" alterado para ${novoStatus}`);
      onUpdateTarefa(updatedTarefa);
      return;
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
      toast.error('Erro ao atualizar status da tarefa. Tente novamente.');
    }
  };

  return (
    <div>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className="border-b py-2 flex items-center justify-between">
              <div>
                <p className="font-semibold">{tarefa.nome}</p>
                <p className="text-sm text-gray-600">{tarefa.descricao}</p>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded ${tarefa.status === 'pendente' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                  {tarefa.status}
                </span>
                <div className="ml-4">
                  <button
                    onClick={() => handleStatusChange(tarefa, tarefa.status === 'pendente' ? 'Concluída' : 'Em andamento')}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    {tarefa.status === 'pendente' ? 'Concluir' : 'Reativar'}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};