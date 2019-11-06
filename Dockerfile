FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY Membros/*.csproj ./Membros/
WORKDIR /app/Membros
RUN dotnet restore

# copy and publish app and libraries
WORKDIR /app/
COPY Membros/. ./Membros/
WORKDIR /app/Membros
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS runtime
ENV ASPNETCORE_URLS http://*:5000
WORKDIR /app
COPY --from=build /app/Membros/out ./
ENTRYPOINT ["dotnet", "Membros.dll"]
