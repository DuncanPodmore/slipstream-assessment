using System.Text;
using Backend.Domain.Entities;
using Backend.Domain.Repositories;
using Dapper;

namespace Backend.Persistence.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly DatabaseContext _context;

        public ClientRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Client> GetClientByIdAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                var clientQuery = "SELECT * FROM Clients WHERE Id = @Id";
                var addressQuery = "SELECT * FROM Addresses WHERE ClientId = @Id";
                var phoneNumberQuery = "SELECT * FROM PhoneNumbers WHERE ClientId = @Id";

                var client = await connection.QuerySingleOrDefaultAsync<Client>(clientQuery, new { Id = id });
                if (client != null)
                {
                    var addresses = await connection.QueryAsync<Address>(addressQuery, new { Id = id });
                    client.Addresses = addresses.ToList();

                    var phoneNumbers = await connection.QueryAsync<PhoneNumber>(phoneNumberQuery, new { Id = id });
                    client.PhoneNumbers = phoneNumbers.ToList();
                }

                return client;
            }
        }

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                var clientQuery = "SELECT * FROM Clients";
                var addressQuery = "SELECT * FROM Addresses WHERE ClientId = @ClientId";
                var phoneNumberQuery = "SELECT * FROM PhoneNumbers WHERE ClientId = @ClientId";

                var clients = await connection.QueryAsync<Client>(clientQuery);
                foreach (var client in clients)
                {
                    var addresses = await connection.QueryAsync<Address>(addressQuery, new { ClientId = client.Id });
                    client.Addresses = addresses.ToList();

                    var phoneNumbers = await connection.QueryAsync<PhoneNumber>(phoneNumberQuery, new { ClientId = client.Id });
                    client.PhoneNumbers = phoneNumbers.ToList();
                }

                return clients;
            }
        }

        public async Task AddClientAsync(Client client)
        {
            using (var connection = _context.CreateConnection())
            {
                var clientInsert = "INSERT INTO Clients (FirstName, LastName, Gender, DateOfBirth) VALUES (@FirstName, @LastName, @Gender, @DateOfBirth); SELECT CAST(SCOPE_IDENTITY() as int)";
                var clientId = await connection.QuerySingleAsync<int>(clientInsert, new { client.FirstName, client.LastName, client.Gender, client.DateOfBirth });

                foreach (var address in client.Addresses)
                {
                    var addressInsert = "INSERT INTO Addresses (Type, Details, ClientId) VALUES (@Type, @Details, @ClientId)";
                    await connection.ExecuteAsync(addressInsert, new { address.Type, address.Details, ClientId = clientId });
                }

                foreach (var phoneNumber in client.PhoneNumbers)
                {
                    var phoneNumberInsert = "INSERT INTO PhoneNumbers (Number, Type, ClientId) VALUES (@Number, @Type, @ClientId)";
                    await connection.ExecuteAsync(phoneNumberInsert, new { phoneNumber.Number, phoneNumber.Type, ClientId = clientId });
                }
            }
        }

        public async Task UpdateClientAsync(Client client)
        {
            using (var connection = _context.CreateConnection())
            {
                var clientUpdate = "UPDATE Clients SET FirstName = @FirstName, LastName = @LastName, Gender = @Gender, DateOfBirth = @DateOfBirth WHERE Id = @Id";
                await connection.ExecuteAsync(clientUpdate, new { client.FirstName, client.LastName, client.Gender, client.DateOfBirth, client.Id });

                var addressDelete = "DELETE FROM Addresses WHERE ClientId = @ClientId";
                await connection.ExecuteAsync(addressDelete, new { ClientId = client.Id });

                foreach (var address in client.Addresses)
                {
                    var addressInsert = "INSERT INTO Addresses (Type, Details, ClientId) VALUES (@Type, @Details, @ClientId)";
                    await connection.ExecuteAsync(addressInsert, new { address.Type, address.Details, ClientId = client.Id });
                }

                var phoneNumberDelete = "DELETE FROM PhoneNumbers WHERE ClientId = @ClientId";
                await connection.ExecuteAsync(phoneNumberDelete, new { ClientId = client.Id });

                foreach (var phoneNumber in client.PhoneNumbers)
                {
                    var phoneNumberInsert = "INSERT INTO PhoneNumbers (Number, Type, ClientId) VALUES (@Number, @Type, @ClientId)";
                    await connection.ExecuteAsync(phoneNumberInsert, new { phoneNumber.Number, phoneNumber.Type, ClientId = client.Id });
                }
            }
        }

        public async Task DeleteClientAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                var addressDelete = "DELETE FROM Addresses WHERE ClientId = @ClientId";
                var phoneNumberDelete = "DELETE FROM PhoneNumbers WHERE ClientId = @ClientId";
                var clientDelete = "DELETE FROM Clients WHERE Id = @Id";

                await connection.ExecuteAsync(addressDelete, new { ClientId = id });
                await connection.ExecuteAsync(phoneNumberDelete, new { ClientId = id });
                await connection.ExecuteAsync(clientDelete, new { Id = id });
            }
        }

        public async Task<string> ExportClientsAsync()
        {
            var clients = await GetAllClientsAsync();

            var csvBuilder = new StringBuilder();
            csvBuilder.AppendLine("Id,FirstName,LastName,Gender,DateOfBirth,AddressType,AddressDetails");

            foreach (var client in clients)
            {
                var clientLine = $"{client.Id},{client.FirstName},{client.LastName},{client.Gender},{client.DateOfBirth},";
                foreach (var address in client.Addresses)
                {
                    clientLine += $"{address.Type},{address.Details};";
                }
                csvBuilder.AppendLine(clientLine);
            }

            return csvBuilder.ToString();
        }
    }
}