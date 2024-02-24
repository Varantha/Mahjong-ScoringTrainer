
run "test" {
  assert {
    condition     = azurerm_resource_group.this.location == "westeurope"
    error_message = "Location not set to 'westeurope'"
  }
}