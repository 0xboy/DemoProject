using System;

namespace DemoProject.Domain.Entities
{
    public class Card
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
} 