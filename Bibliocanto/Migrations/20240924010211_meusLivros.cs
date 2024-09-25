using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliocanto.Migrations
{
    /// <inheritdoc />
    public partial class meusLivros : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MeusLivros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Lido = table.Column<int>(type: "int", nullable: false),
                    Relido = table.Column<int>(type: "int", nullable: false),
                    IdLivro = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeusLivros", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MeusLivros_Livros_IdLivro",
                        column: x => x.IdLivro,
                        principalTable: "Livros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MeusLivros_IdLivro",
                table: "MeusLivros",
                column: "IdLivro");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MeusLivros");
        }
    }
}
