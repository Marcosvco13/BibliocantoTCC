using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliocanto.Migrations
{
    /// <inheritdoc />
    public partial class AtuNovasTabelas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvaliacaoLivroId",
                table: "Livros",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EstantesIdUser",
                table: "Livros",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResenhasId",
                table: "Livros",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AvaliacaoLivros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdLivroId = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    QuantEstrela = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvaliacaoLivros", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvaliacaoLivros_Livros_IdLivroId",
                        column: x => x.IdLivroId,
                        principalTable: "Livros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Estantes",
                columns: table => new
                {
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    IdLivroId = table.Column<int>(type: "int", nullable: false),
                    Lido = table.Column<bool>(type: "bit", nullable: false),
                    Relido = table.Column<int>(type: "int", nullable: false),
                    DateAdd = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estantes", x => x.IdUser);
                    table.ForeignKey(
                        name: "FK_Estantes_Livros_IdLivroId",
                        column: x => x.IdLivroId,
                        principalTable: "Livros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AvaliacaoComentarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdComentarioId = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Curtida = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvaliacaoComentarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AvaliacaoResenhas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdResenhaId = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Curtida = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvaliacaoResenhas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ComentarioResenhas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdResenhaId = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Comentario = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DataComentario = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AvaliacaoComentarioId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComentarioResenhas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComentarioResenhas_AvaliacaoComentarios_AvaliacaoComentarioId",
                        column: x => x.AvaliacaoComentarioId,
                        principalTable: "AvaliacaoComentarios",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Resenhas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdLivrosId = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    TituloResenha = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Resenha = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    DataResenha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AvaliacaoResenhaId = table.Column<int>(type: "int", nullable: true),
                    ComentarioResenhaId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resenhas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Resenhas_AvaliacaoResenhas_AvaliacaoResenhaId",
                        column: x => x.AvaliacaoResenhaId,
                        principalTable: "AvaliacaoResenhas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Resenhas_ComentarioResenhas_ComentarioResenhaId",
                        column: x => x.ComentarioResenhaId,
                        principalTable: "ComentarioResenhas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Resenhas_Livros_IdLivrosId",
                        column: x => x.IdLivrosId,
                        principalTable: "Livros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Livros",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AvaliacaoLivroId", "EstantesIdUser", "ResenhasId" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "Livros",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AvaliacaoLivroId", "EstantesIdUser", "ResenhasId" },
                values: new object[] { null, null, null });

            migrationBuilder.CreateIndex(
                name: "IX_Livros_AvaliacaoLivroId",
                table: "Livros",
                column: "AvaliacaoLivroId");

            migrationBuilder.CreateIndex(
                name: "IX_Livros_EstantesIdUser",
                table: "Livros",
                column: "EstantesIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Livros_ResenhasId",
                table: "Livros",
                column: "ResenhasId");

            migrationBuilder.CreateIndex(
                name: "IX_AvaliacaoComentarios_IdComentarioId",
                table: "AvaliacaoComentarios",
                column: "IdComentarioId");

            migrationBuilder.CreateIndex(
                name: "IX_AvaliacaoLivros_IdLivroId",
                table: "AvaliacaoLivros",
                column: "IdLivroId");

            migrationBuilder.CreateIndex(
                name: "IX_AvaliacaoResenhas_IdResenhaId",
                table: "AvaliacaoResenhas",
                column: "IdResenhaId");

            migrationBuilder.CreateIndex(
                name: "IX_ComentarioResenhas_AvaliacaoComentarioId",
                table: "ComentarioResenhas",
                column: "AvaliacaoComentarioId");

            migrationBuilder.CreateIndex(
                name: "IX_ComentarioResenhas_IdResenhaId",
                table: "ComentarioResenhas",
                column: "IdResenhaId");

            migrationBuilder.CreateIndex(
                name: "IX_Estantes_IdLivroId",
                table: "Estantes",
                column: "IdLivroId");

            migrationBuilder.CreateIndex(
                name: "IX_Resenhas_AvaliacaoResenhaId",
                table: "Resenhas",
                column: "AvaliacaoResenhaId");

            migrationBuilder.CreateIndex(
                name: "IX_Resenhas_ComentarioResenhaId",
                table: "Resenhas",
                column: "ComentarioResenhaId");

            migrationBuilder.CreateIndex(
                name: "IX_Resenhas_IdLivrosId",
                table: "Resenhas",
                column: "IdLivrosId");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_AvaliacaoLivros_AvaliacaoLivroId",
                table: "Livros",
                column: "AvaliacaoLivroId",
                principalTable: "AvaliacaoLivros",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Estantes_EstantesIdUser",
                table: "Livros",
                column: "EstantesIdUser",
                principalTable: "Estantes",
                principalColumn: "IdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Livros_Resenhas_ResenhasId",
                table: "Livros",
                column: "ResenhasId",
                principalTable: "Resenhas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AvaliacaoComentarios_ComentarioResenhas_IdComentarioId",
                table: "AvaliacaoComentarios",
                column: "IdComentarioId",
                principalTable: "ComentarioResenhas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AvaliacaoResenhas_Resenhas_IdResenhaId",
                table: "AvaliacaoResenhas",
                column: "IdResenhaId",
                principalTable: "Resenhas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ComentarioResenhas_Resenhas_IdResenhaId",
                table: "ComentarioResenhas",
                column: "IdResenhaId",
                principalTable: "Resenhas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Livros_AvaliacaoLivros_AvaliacaoLivroId",
                table: "Livros");

            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Estantes_EstantesIdUser",
                table: "Livros");

            migrationBuilder.DropForeignKey(
                name: "FK_Livros_Resenhas_ResenhasId",
                table: "Livros");

            migrationBuilder.DropForeignKey(
                name: "FK_AvaliacaoComentarios_ComentarioResenhas_IdComentarioId",
                table: "AvaliacaoComentarios");

            migrationBuilder.DropForeignKey(
                name: "FK_Resenhas_ComentarioResenhas_ComentarioResenhaId",
                table: "Resenhas");

            migrationBuilder.DropForeignKey(
                name: "FK_AvaliacaoResenhas_Resenhas_IdResenhaId",
                table: "AvaliacaoResenhas");

            migrationBuilder.DropTable(
                name: "AvaliacaoLivros");

            migrationBuilder.DropTable(
                name: "Estantes");

            migrationBuilder.DropTable(
                name: "ComentarioResenhas");

            migrationBuilder.DropTable(
                name: "AvaliacaoComentarios");

            migrationBuilder.DropTable(
                name: "Resenhas");

            migrationBuilder.DropTable(
                name: "AvaliacaoResenhas");

            migrationBuilder.DropIndex(
                name: "IX_Livros_AvaliacaoLivroId",
                table: "Livros");

            migrationBuilder.DropIndex(
                name: "IX_Livros_EstantesIdUser",
                table: "Livros");

            migrationBuilder.DropIndex(
                name: "IX_Livros_ResenhasId",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "AvaliacaoLivroId",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "EstantesIdUser",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "ResenhasId",
                table: "Livros");
        }
    }
}
