using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.Entities;

namespace Backend.Application.Interfaces
{
    public interface IClientService
    {
        public Task<Client> GetClientByIdAsync(int id);
        public Task<IEnumerable<Client>> GetAllClientsAsync();
        public Task AddClientAsync(Client client);
        public Task UpdateClientAsync(Client client);
        public Task DeleteClientAsync(int id);
        public Task<string> ExportClientsAsync();
    }
}
