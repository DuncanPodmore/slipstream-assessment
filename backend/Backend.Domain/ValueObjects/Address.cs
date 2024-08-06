namespace Backend.Domain.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Details { get; set; }
        public int ClientId { get; set; }
    }
}

