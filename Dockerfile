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

###########
# Dependencies for libraries
RUN ln -s /lib/x86_64-linux-gnu/libdl-2.24.so /lib/x86_64-linux-gnu/libdl.so

# install native dependencies
RUN apt-get update \
    && apt-get install -y --allow-unauthenticated --no-install-recommends \
         apt-utils \
   	 libgdiplus \
         libx11-6 \
         libxext6 \
         libxrender1 \
      && curl -o /usr/lib/libwkhtmltox.so \
        --location \
        https://github.com/rdvojmoc/DinkToPdf/raw/v1.0.8/v0.12.4/64%20bit/libwkhtmltox.so

###########

ENV ASPNETCORE_URLS http://*:5000
WORKDIR /app
COPY --from=build /app/Membros/out ./
ENTRYPOINT ["dotnet", "Membros.dll"]
