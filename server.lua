ESX = nil
 
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function DiscordHook(hook,message,color)
  local hooke = 'https://discordapp.com/api/webhooks/709820290569601133/AlzaXIO1PXyjIVs8Ubh5C8vyQnAqL68PdG9HmtWOVpv_6DJ5f8vagyDiT3567iwuAfAn'
  local embeds = {
              {
          ["title"] = message,
          ["type"] = "rich",
          ["color"] = color,
          ["footer"] = {
      ["text"] = 'GoldenGateRP | Logi'
                  },
              }
          }
  if message == nil or message == '' then return FALSE end
  PerformHttpRequest(hooke, function(err, text, headers) end, 'POST', json.encode({ username = hook,embeds = embeds}), { ['Content-Type'] = 'application/json' })
end


function tabletlogimechanicdc(hook,message,color)
  local hooke = 'https://discordapp.com/api/webhooks/786206805335867442/4hJ5cLUF1rBibd8KhdAEXFLhMOHR9z-JUqWMxJ7thDwGYLKRhcpS81gbQNOm77LNA7E1'
  local embeds = {
              {
          ["title"] = message,
          ["type"] = "rich",
          ["color"] = color,
          ["footer"] = {
      ["text"] = 'GoldenGateRP | Logi'
                  },
              }
          }
  if message == nil or message == '' then return FALSE end
  PerformHttpRequest(hooke, function(err, text, headers) end, 'POST', json.encode({ username = hook,embeds = embeds}), { ['Content-Type'] = 'application/json' })
end

RegisterServerEvent('projektsantos21:mandatMechanik')
AddEventHandler('projektsantos21:mandatMechanik', function(target, fine, powod)
      
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(target)
        local identy = xPlayer.getIdentifier()
        local sourceXPlayer = ESX.GetPlayerFromId(_source)
        local targetXPlayer = ESX.GetPlayerFromId(target)
        local imieTargetu = GetCharacterName(target)
        local naziwskoTargetu = GetNazwisko(target)
        local imieSendera = GetCharacterName(_source)
        local nazwiskoSendera = GetNazwisko(_source)
        targetXPlayer.removeAccountMoney('bank', fine)
 
        TriggerEvent('esx_addonaccount:getSharedAccount', 'society_mechanic', function(account)
            account.addMoney(fine)
        end)
        
        TriggerClientEvent('esx:showNotification', _source, "Wystawiasz fakturę dla: ("..target..")")
        TriggerClientEvent('esx:showNotification', xPlayer.source, '('.._source..') Wystawił Ci fakturę na kwotę: ('..fine..'$) z powodem: ('..powod..')!')
        local xPlayers = ESX.GetPlayers()
 
        local steamid = sourceXPlayer.identifier
        local steamid2 = targetXPlayer.identifier
 
        local name1 = GetPlayerName(_source)
        local name2 = GetPlayerName(target)
 
        local dane = "[ID: ".._source.." | Nazwa: "..name1.." | SteamID: "..steamid.." ]"
        local dane2 = "[ID: "..target.." | Nazwa: "..name2.." | SteamID: "..steamid2.." ]"
                      
         wiadomosc = "Powód: "..powod.."\nKwota: "..fine.."\nKto wydał: "..dane.."\nKto otrzymał: "..dane2..""
 
        DiscordHook('LSC: Mandat', wiadomosc, 1669329)
        tabletlogimechanicdc('LSC: Mandat', wiadomosc, 1669329)

end)
 
function GetCharacterName(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    local result = MySQL.Sync.fetchAll('SELECT * FROM users WHERE identifier = @identifier',
    {
        ['@identifier'] =  GetPlayerIdentifiers(source)[1]
    })
 
    if result[1] ~= nil and result[1].firstname ~= nil and result[1].lastname ~= nil then
        return result[1].firstname .. ' ' .. result[1].lastname
    else
        return GetPlayerName(source)
    end
end
 
function GetNazwisko(source)
    local result = MySQL.Sync.fetchAll('SELECT * FROM users WHERE identifier = @identifier',
    {
        ['@identifier'] = GetPlayerIdentifiers(source)[1]
    })
 
    if result[1] ~= nil and result[1].lastname ~= nil then
        return result[1].lastname
    else
        return GetPlayerName(source)
    end
end
-----------------------------------------------------------------------------------------------------------

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

--[ZAPISYWANIE DO BAZY DANYCH]
RegisterServerEvent("AddFormMechanicServer")
  AddEventHandler("AddFormMechanicServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll('INSERT INTO mechanicdata (data, daneklienta, tuning, naprawa, uslugi, ubezpieczenie, danemechanika, kwota) VALUES (@data, @daneklienta, @tuning, @naprawa, @uslugi, @ubezpieczenie, @danemechanika, @kwota)',     

    { 
      ['uslugi'] = daneee.inputUsluga1,
      ['naprawa'] = daneee.inputNaprawa1,
      ['data'] = daneee.inputData1,
      ['daneklienta'] = daneee.inputDane1,
      ['tuning'] = daneee.inputTuning1,
      ['ubezpieczenie'] = daneee.inputUbezpieczenie1,
      ['danemechanika'] = daneee.inputMechanik1,
      ['kwota'] = daneee.inputKwota
    },
    function (result)
      --print(result)    
 end)
end)



RegisterServerEvent("ServerSerchKlientMech")
  AddEventHandler("ServerSerchKlientMech",function(daneee)
    local _source = source

    MySQL.Async.fetchAll('SELECT * FROM mechanicdata WHERE daneklienta LIKE @dane',     

    { 
    ['dane'] =  daneee.inputDaneKlienta,
    },function (result)
    TriggerClientEvent("ClientSearchDaneKlienta", _source, result)
 end)
end)

RegisterServerEvent("ServerSearchMechanikMech")
  AddEventHandler("ServerSearchMechanikMech",function(daneee)
    local _source = source

    MySQL.Async.fetchAll('SELECT * from mechanicdata WHERE danemechanika=@danem',     

    { 
    ['danem'] =  daneee.inputDaneMechanika,
    },function (result)
        TriggerClientEvent("ClientSearchDaneMechanika", _source, result)
 end)
end)



RegisterServerEvent("GetKlientNameMechServer")
  AddEventHandler("GetKlientNameMechServer",function(target, daneee)

    local imieTargetu = GetCharacterName(target)

    local danekleinta1 = imieTargetu
    local _source = source

    local result = {
        danekleinta = danekleinta1
 
    }
      TriggerClientEvent("GetKlientNameMechClient", -1, result)
 

end)

RegisterServerEvent("DeleteMechanicDataServer")
  AddEventHandler("DeleteMechanicDataServer",function(daneee)
    local _source = source
    MySQL.Async.fetchAll('DELETE FROM mechanicdata WHERE ID=@id',     

    { 
    ['@id'] =  tonumber(daneee.IDRekorduDel)
    })
end)


RegisterServerEvent("FakturaDataLastServer")
  AddEventHandler("FakturaDataLastServer",function(daneee)
    local _source = source
    MySQL.Async.fetchAll('SELECT daneklienta, kwota FROM mechanicdata WHERE danemechanika = @dane ORDER BY ID DESC LIMIT 1',     
    { 
    ['@dane'] = daneee.danemechanikafaktura
    },function(data)

      if data[1] ~= nil then
          dataklienta = data[1].daneklienta
          datakwota = data[1].kwota
    
          local result = {
            mechanikdaneS = dataklienta,
            kwotadozaplaty = datakwota,
          }
    
        TriggerClientEvent("FakturaDataLastClient", _source, result)
      end
    end)
end)



--[ODCZYTYWANIE OSTATNICH REKORDÓW Z BAZY]
RegisterServerEvent("SearchLastMechServer")
  AddEventHandler("SearchLastMechServer",function(daneee)
    local _source = source

    MySQL.Async.fetchAll("SELECT * FROM mechanicdata ORDER BY id DESC LIMIT @ilosc ",{ ['@ilosc'] = tonumber(daneee.InputSearchLast1Mech);  }
    ,function (result)
      TriggerClientEvent("SearchLastMechClient", _source, result)
    end)
end)



RegisterServerEvent("Stats1ServerMech")
  AddEventHandler("Stats1ServerMech",function(daneee)
    local _source = source

MySQL.Async.fetchAll("SELECT naprawa, COUNT(naprawa) AS ilosc FROM mechanicdata GROUP BY naprawa ORDER BY ilosc DESC",{}  
,function (result)
    TriggerClientEvent("Stats1ClientMech", _source, result)
     print(result)  
end)
end)

RegisterServerEvent("Stats2ServerMech")
  AddEventHandler("Stats2ServerMech",function(daneee)
    local _source = source

MySQL.Async.fetchAll("SELECT danemechanika, COUNT(danemechanika) AS ilosc FROM mechanicdata GROUP BY danemechanika ORDER BY ilosc DESC",{}   
,function (result)
    TriggerClientEvent("Stats2ClientMech", _source, result)
end)
end)

RegisterServerEvent("Stats3ServerMech")
  AddEventHandler("Stats3ServerMech",function(daneee)
    local _source = source

MySQL.Async.fetchAll("SELECT daneklienta, COUNT(daneklienta) AS ilosc FROM mechanicdata GROUP BY daneklienta ORDER BY ilosc DESC",{}   
,function (result)
    TriggerClientEvent("Stats3ClientMech", _source, result)
end)
end)

RegisterServerEvent('ServerMechanicListOfAmbulance')
  AddEventHandler("ServerMechanicListOfAmbulance",function(daneee)
    local _source = source

  MySQL.Async.fetchAll("SELECT firstname, lastname FROM users WHERE job=@job OR job=@job2 ORDER BY lastname",{
  ['job'] = 'ambulance',
  ['job2'] = 'offambulance'}   
    ,function (result)
      TriggerClientEvent("makeTableAmbulance", _source, result)
    end)
end)

RegisterServerEvent('ServerMechanicListOfSheriff')
  AddEventHandler("ServerMechanicListOfSheriff",function(daneee)
    local _source = source

  MySQL.Async.fetchAll("SELECT firstname, lastname FROM users WHERE job=@job OR job=@job2 ORDER BY lastname",{ 
  ['job'] = 'sheriff',
  ['job2'] = 'offsheriff'}   
    ,function (result)
      TriggerClientEvent("makeTableSheriffMechanic", _source, result)
    end)
end)


RegisterServerEvent("DaneBazaMenuMechServer")
  AddEventHandler("DaneBazaMenuMechServer",function(jobName1, identifier)
    local _source = source

    MySQL.Async.fetchAll("SELECT firstname, lastname FROM users WHERE job=@job AND identifier=@identifier ",{ 
      ['@job'] = jobName1,
      ['@identifier'] = identifier
    },function(wynik)

    if wynik[1] ~= nil then 

    local firstname = wynik[1].firstname
    local lastname = wynik[1].lastname
    local danemechanika = firstname .. " " .. lastname

    local count = MySQL.Async.fetchAll("SELECT COUNT(danemechanika) AS ilosc FROM mechanicdata WHERE danemechanika=@mechanik",
    {
      ['@mechanik'] = danemechanika
    },function(data)
    
   wynik1 = data[1].ilosc

    local result = {
      mechanikdane = danemechanika,
      wynik = wynik1,
    }
      TriggerClientEvent("DaneBazaMenuMechClient", _source, result)
    end)
  end

  end)
end)
