using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliocanto.Migrations
{
    /// <inheritdoc />
    public partial class teste : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Generos_generoid",
                table: "Livros");

            migrationBuilder.RenameColumn(
                name: "isbn",
                table: "Livros",
                newName: "Isbn");

            migrationBuilder.RenameColumn(
                name: "generoid",
                table: "Livros",
                newName: "GeneroId");

            migrationBuilder.RenameIndex(
                name: "IX_Livros_generoid",
                table: "Livros",
                newName: "IX_Livros_GeneroId");

            migrationBuilder.RenameColumn(
                name: "nomegenero",
                table: "Generos",
                newName: "NomeGenero");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Generos",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Generos_GeneroId",
                table: "Livros",
                column: "GeneroId",
                principalTable: "Generos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Generos_GeneroId",
                table: "Livros");

            migrationBuilder.RenameColumn(
                name: "Isbn",
                table: "Livros",
                newName: "isbn");

            migrationBuilder.RenameColumn(
                name: "GeneroId",
                table: "Livros",
                newName: "generoid");

            migrationBuilder.RenameIndex(
                name: "IX_Livros_GeneroId",
                table: "Livros",
                newName: "IX_Livros_generoid");

            migrationBuilder.RenameColumn(
                name: "NomeGenero",
                table: "Generos",
                newName: "nomegenero");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Generos",
                newName: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Generos_generoid",
                table: "Livros",
                column: "generoid",
                principalTable: "Generos",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
