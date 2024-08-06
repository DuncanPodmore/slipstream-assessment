using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Backend.Domain.Repositories;

namespace Backend.Application.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;

        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public Task<Client> GetClientByIdAsync(int id)
        {
            return _clientRepository.GetClientByIdAsync(id);
        }

        public Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            return _clientRepository.GetAllClientsAsync();
        }

        public Task AddClientAsync(Client client)
        {
            return _clientRepository.AddClientAsync(client);
        }

        public Task UpdateClientAsync(Client client)
        {
            return _clientRepository.UpdateClientAsync(client);
        }

        public Task DeleteClientAsync(int id)
        {
            return _clientRepository.DeleteClientAsync(id);
        }

        public Task<string> ExportClientsAsync()
        {
            return _clientRepository.ExportClientsAsync();
        }
    }
}
