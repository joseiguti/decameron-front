<template>
  <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo-decameron.png" alt="" width="80" class="d-inline-block align-text-top">
        Panel Gerentes
      </router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/listado">Ver Hoteles</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
